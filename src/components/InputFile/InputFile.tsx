import { FC, useState } from 'react'

import { CloudUpload, Delete, InsertDriveFile, Refresh } from '@mui/icons-material'
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material'
import { AxiosError } from 'axios'
import Dropzone from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'

import { apiAddFile } from '../../api/apiAddFile'
import { CONSTANTS } from '../../constants/constants'
import { AddTypeFile } from '../../types/AddTypeFile'
import { fileSizeConverter } from '../../utils/fileSizeConverter'
import { generateFileStatusArr } from '../../utils/generateFileStatusArr'

// const useStyles = makeStyles({
//   root: {
//     backgroundColor: '#eee',
//     textAlign: 'center',
//     cursor: 'pointer',
//     color: '#333',
//     padding: '10px',
//     marginTop: '20px',
//   },
//   icon: {
//     marginTop: '16px',
//     color: '#888888',
//     fontSize: '42px',
//   },
// })

export const FileInput: FC = () => {
  // const styles = useStyles()
  const [value, setValue] = useState<AddTypeFile[]>([])
  const [isDisabledBtn, setIsDisabledBtn] = useState(true)

  const addFile = (file: File[]) => {
    if (value.length + file.length <= CONSTANTS.maxValueFiles) {
      const newArr: AddTypeFile[] = file.map(el => ({
        id: uuidv4(),
        status: 'idle',
        file: el,
        errorMessage: null,
      }))

      setValue(prev => [...prev, ...newArr])
      setIsDisabledBtn(false)
    } else {
      alert(`file length more ${CONSTANTS.maxValueFiles}`)
    }
  }

  const addFilesServer = async (index?: number) => {
    setIsDisabledBtn(true)
    for (let i = index || 0; i < value.length; i++) {
      if (value[i].status === 'success') continue
      try {
        const response = await apiAddFile(value[i].file.name, value[i].file)

        if (response.status === 201) {
          setValue(prev => generateFileStatusArr(prev, prev[i].id, 'success', null))
        } else {
          setValue(prev => generateFileStatusArr(prev, prev[i].id, 'error', null))
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const err = error.response?.data.message

          setValue(prev => generateFileStatusArr(prev, prev[i].id, 'error', err))
        } else {
          const err = new Error('Какая-то Ошибка').message

          setValue(prev => generateFileStatusArr(prev, prev[i].id, 'error', err))
        }
      }
    }
    setIsDisabledBtn(false)
  }

  const deleteFile = (id: string) => {
    const arr = value.filter(el => el.id !== id)

    setValue(arr)
  }
  const clearFileState = () => {
    setValue([])
  }

  const refreshRequest = async (id: string) => {
    const index = value.findIndex(el => el.id === id)

    await addFilesServer(index)
  }

  return (
    <>
      <Dropzone onDrop={addFile} maxFiles={CONSTANTS.maxValueFiles}>
        {({ getRootProps, getInputProps, fileRejections }) => (
          <Paper variant="outlined" {...getRootProps()} sx={{ cursor: 'pointer' }}>
            <CloudUpload />
            <input {...getInputProps()} />
            <p>Drag drop files here, or click to select files</p>
            <div>
              {fileRejections.map(({ file, errors }, index) => (
                <p key={file.name}>{errors[index]?.message}</p>
              ))}
            </div>
          </Paper>
        )}
      </Dropzone>
      <List>
        {value.map(f => (
          <ListItem key={f.id}>
            <ListItemIcon>
              <InsertDriveFile />
            </ListItemIcon>
            <ListItemText primary={f.file.name} secondary={fileSizeConverter(f.file.size)} />
            {f.status !== 'error' ? (
              <IconButton onClick={() => deleteFile(f.id)}>
                <Delete />
              </IconButton>
            ) : (
              <IconButton onClick={() => refreshRequest(f.id)}>
                <Refresh />
              </IconButton>
            )}
            {f.status === 'success' && <ListItemText primary={f.status} />}
            {f.status === 'error' && <ListItemText primary={f.errorMessage} />}
          </ListItem>
        ))}
      </List>
      <Button onClick={() => addFilesServer()} disabled={isDisabledBtn}>
        ADD
      </Button>
      <Button onClick={clearFileState} disabled={isDisabledBtn}>
        delete all
      </Button>
    </>
  )
}

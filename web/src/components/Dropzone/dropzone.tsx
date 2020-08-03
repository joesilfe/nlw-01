import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { MdCloudUpload, MdDelete } from 'react-icons/md'

import './dropzone.css'

interface Props {
    onFileUpLoaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUpLoaded }) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState<string>('')

    // useCallback serve para memorizar funções e só recarrega quando algo muda
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl)
        onFileUpLoaded(file)
    }, [onFileUpLoaded])
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*'
    })

    return (
        <section>
            <div className="dropzone" {...getRootProps()}>

                <input {...getInputProps()} accept="image/*" />

                {selectedFileUrl
                    ? <img src={selectedFileUrl} alt="Point Thumbnail" />
                    : (
                        isDragActive
                            ?
                            <p>< MdCloudUpload /> Solte a imagem aqui...</p>
                            :
                            <p>
                                <MdCloudUpload />
                                <span>Arraste e solte ou <span> clique </span>e selecione a imagem</span>
                            </p>
                    )}
            </div >
            <button type='button' onClick={() => setSelectedFileUrl('')}>
                <span><MdDelete /></span>
                <strong>Excluir imagem</strong>
            </button>
        </ section>
    )
}

export default Dropzone;
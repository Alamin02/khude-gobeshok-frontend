import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';


const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
    flexWrap: 'wrap',
    marginTop: 5
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 200,
    height: 150,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};


export default function Previews(props) {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            props.imageChange(acceptedFiles[0]);
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    alt=""
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="container" >
            <div style={{
                minHeight: "100px",
                background: "#e3f2fd",
                padding: "10px",
                textAlign: "center",
            }} {...getRootProps({ className: 'dropzone' })} >
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <aside style={thumbsContainer}>
                    {thumbs}
                </aside>
            </div>

        </section>
    );
}
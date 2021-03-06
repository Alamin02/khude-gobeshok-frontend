import React from 'react';
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

export default function ImageDragnDrop(props) {
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            props.imageChange(acceptedFiles[0]);
        }
    });

    const thumbs = (
        <div style={thumb} key={props.url}>
            <div style={thumbInner}>
                <img
                    src={props.url}
                    style={img}
                    alt=""
                />
            </div>
        </div>
    );

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
import React from 'react';

export const MediaCard = ({ media, editMediaRecord, removeMediaItem, openDetailView }) => {
    return (
        <div className="card h-100 bg-black text-white border-0 shadow-lg">
            <img
                src={media.imagen || 'https://via.placeholder.com/300x450?text=Sin+Poster'}
                className="card-img-top"
                alt={media.titulo}
                style={{ height: '350px', objectFit: 'cover' }}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/300x450?text=Sin+Poster'; }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title text-danger fw-bold text-truncate" title={media.titulo}>{media.titulo}</h5>
                <p className="card-text small text-truncate" title={media.sinopsis} style={{ flexGrow: 1 }}>{media.sinopsis || 'Sin descripción'}</p>

                <div className="d-flex justify-content-between mt-2 align-items-center">
                    <span className="badge bg-danger rounded-pill px-3 py-2">{media.anioEstreno}</span>
                    <span className="badge bg-secondary rounded-pill">{media.tipo?.nombre}</span>
                </div>
                <div className="mt-2 text-muted small text-truncate">
                    🎬 {media.director?.nombres} | {media.genero?.nombre}
                </div>

                <div className="d-grid mt-3">
                    <button
                        className="btn btn-sm btn-info fw-bold text-dark shadow-sm py-2"
                        onClick={() => openDetailView(media)}
                    >
                        👁️ VER DETALLES
                    </button>
                </div>

                <div className="mt-3 pt-3 border-top border-secondary d-flex justify-content-center flex-nowrap">
                    <button className="btn btn-sm btn-outline-info btn-action" onClick={() => editMediaRecord(media)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger btn-action" onClick={() => removeMediaItem(media._id)}>Eliminar</button>
                </div>
            </div>
        </div>
    );
};

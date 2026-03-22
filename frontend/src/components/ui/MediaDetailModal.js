import React from 'react';

export const MediaDetailModal = ({ media, onClose }) => {
  if (!media) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content glass-panel border-info shadow-glow">
          <div className="modal-header border-secondary">
            <h4 className="modal-title text-info fw-black">{media.titulo}</h4>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4">
            <div className="row">
              <div className="col-md-5 mb-3">
                <img 
                  src={media.imagen || 'https://via.placeholder.com/300x450?text=Sin+Poster'} 
                  className="img-fluid rounded shadow-lg border border-secondary" 
                  alt={media.titulo}
                  style={{ width: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="col-md-7">
                <div className="mb-4">
                  <h6 className="text-secondary text-uppercase small fw-bold mb-2">Sinopsis</h6>
                  <p className="text-white lead" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {media.sinopsis || 'Sin descripción disponible para este título.'}
                  </p>
                </div>
                
                <div className="row g-3">
                  <div className="col-6">
                    <h6 className="text-info small text-uppercase fw-bold mb-1">Director</h6>
                    <p className="text-white mb-0">{media.director?.nombres || 'No asignado'}</p>
                  </div>
                  <div className="col-6">
                    <h6 className="text-info small text-uppercase fw-bold mb-1">Género</h6>
                    <p className="text-white mb-0">{media.genero?.nombre || 'General'}</p>
                  </div>
                  <div className="col-6">
                    <h6 className="text-info small text-uppercase fw-bold mb-1">Año</h6>
                    <p className="text-white mb-0">{media.anioEstreno}</p>
                  </div>
                  <div className="col-6">
                    <h6 className="text-info small text-uppercase fw-bold mb-1">Tipo</h6>
                    <p className="text-white mb-0">{media.tipo?.nombre || 'Contenido'}</p>
                  </div>
                  <div className="col-12 mt-3">
                    <h6 className="text-info small text-uppercase fw-bold mb-1">Productora</h6>
                    <p className="text-white mb-0">{media.productora?.nombre || 'Independiente'}</p>
                  </div>
                </div>

                <div className="mt-5 d-grid">
                  <a 
                    href={media.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-info btn-lg fw-bold text-dark shadow-sm"
                  >
                    ▶️ Ver Selección / Tráiler
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer border-top-0 pt-0 pb-4 justify-content-center">
            <button type="button" className="btn btn-outline-secondary px-5" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

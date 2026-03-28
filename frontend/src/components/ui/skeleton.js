import React from 'react';

export const SkeletonCard = () => {
  return (
    <div className="card h-100 bg-black border-0 shadow-lg overflow-hidden">
      <div className="skeleton" style={{ height: '350px' }}></div>
      <div className="card-body">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text" style={{ width: '40%' }}></div>
        <div className="d-flex justify-content-between mt-3">
          <div className="skeleton" style={{ height: '30px', width: '60px', borderRadius: '20px' }}></div>
          <div className="skeleton" style={{ height: '30px', width: '60px', borderRadius: '20px' }}></div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonRow = ({ cols = 5 }) => {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i}>
          <div className="skeleton skeleton-row"></div>
        </td>
      ))}
    </tr>
  );
};

import React from 'react';

const NewsCard = ({ author, source, title, description, content, url, imageUrl }) => {
    console.log("this i s newscard",author)
  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl m-4">
      {imageUrl && (
        <figure>
          <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title text-lg">
          {title}
          <div className="badge badge-secondary">{source}</div>
        </h2>
        <p className="text-sm text-gray-500 mb-2">By {author || 'Unknown Author'}</p>
        <p className="mb-2">{description}</p>
        {content && <p className="text-sm text-gray-600 line-clamp-3">{content}</p>}

        <div className="card-actions justify-end mt-4">
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

import React from 'react';

const BlockSelector = ({ selectedBlock, blocks, onBlockChange }) => {
  return (
    <div className="flex gap-2 mb-6">
      {blocks.map((block) => (
        <button
          key={block}
          className={`px-4 py-2 rounded-md transition-colors ${
            selectedBlock === block
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => onBlockChange(block)}
        >
          Block {block}
        </button>
      ))}
    </div>
  );
};

export default BlockSelector;
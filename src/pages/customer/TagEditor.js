import { useState, useEffect } from 'react';
import { Tag, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const TagEditor = ({ tags = [], onChange }) => {

  const [ inputVisible, setInputVisible ] = useState(false);
  const [ inputValue, setInputValue ] = useState('');
  const [ localTags, setLocalTags ] = useState(tags);
  const [ showAll, setShowAll ] = useState(false);

  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  const handleClose = (removedTag) => {
    const newTags = localTags.filter(tag => tag !== removedTag);
    setLocalTags(newTags);
    onChange(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !localTags.includes(inputValue)) {
      const newTags = [...localTags, inputValue];
      setLocalTags(newTags);
      onChange(newTags);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleInputConfirm();
    }
  };

  const maxVisibleTags = 4;
  const shouldShowMore = localTags.length > maxVisibleTags;
  const visibleTags = showAll ? localTags : localTags.slice(0, maxVisibleTags);
  const hiddenCount = localTags.length - maxVisibleTags;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
      {visibleTags.map((tag) => (
        <Tag
          key={tag}
          closable
          onClose={() => handleClose(tag)}
          style={{ margin: 0 }}
        >
          {tag}
        </Tag>
      ))}
      
      {shouldShowMore && !showAll && (
        <Button
          type="link"
          size="small"
          onClick={() => setShowAll(true)}
          style={{ padding: 0, height: 'auto' }}
        >
          +{hiddenCount} thêm
        </Button>
      )}
      
      {showAll && (
        <Button
          type="link"
          size="small"
          onClick={() => setShowAll(false)}
          style={{ padding: 0, height: 'auto' }}
        >
          Ẩn bớt
        </Button>
      )}
      
      {inputVisible ? (
        <Input
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleKeyPress}
          autoFocus
        />
      ) : (
        <Button
          type="dashed"
          size="small"
          onClick={showInput}
          icon={<PlusOutlined />}
          style={{ flexShrink: 0 }}
        >
          Thêm tag
        </Button>
      )}
    </div>
  )
};

export default TagEditor;
import { Button, Paper, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';

function WriteArea() {
  const [content, setContent] = useState("");
  const [postId, setPostId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(true);


  // API 호출 함수
  const handleCreate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPostId(data.id);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRead = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/posts/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setContent(data.content);
      setPostId(id);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setContent("");
      setPostId(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setContent(event.target.value);
  };

  // 편집/미리보기 모드 전환
  const handleToggleMode = () => {
    setIsEditing(!isEditing);
  };

  // 에러 메시지 표시 (예시)
  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <Paper style={{ minHeight: 400, padding: 10 }}>
      <Typography variant="h6" gutterBottom>
        글 작성 공간
      </Typography>

      {/* 편집/미리보기 버튼 */}
      <Button onClick={handleToggleMode} style={{ marginBottom: 10 }}>
        {isEditing ? "미리보기" : "편집"}
      </Button>

      {/* 편집/미리보기 모드에 따른 렌더링 */}
      {isEditing ? (
        <TextField
          label="내용을 작성하세요"
          multiline
          rows={15}
          variant="outlined"
          fullWidth
          style={{ backgroundColor: '#fff', marginBottom: 10 }}
          value={content}
          onChange={handleInputChange}
        />
      ) : (
        <Paper style={{ padding: 10, minHeight: 200, marginBottom: 10 }}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </Paper>
      )}

      {/* CRUD 버튼 */}
      <div>
        <Button onClick={handleCreate} disabled={postId !== null || isLoading}>
          {isLoading && postId === null ? '생성 중...' : '저장'}
        </Button>
        <Button onClick={() => handleRead(1)} disabled={postId !== null || isLoading}>
          {isLoading && postId === null ? '읽는 중...' : '읽기 (ID: 1)'}
        </Button>
        <Button onClick={handleUpdate} disabled={postId === null || isLoading}>
          {isLoading && postId !== null ? '수정 중...' : '수정'}
        </Button>
        <Button onClick={handleDelete} disabled={postId === null || isLoading}>
          {isLoading && postId !== null ? '삭제 중...' : '삭제'}
        </Button>
      </div>
    </Paper>
  );
}


export default WriteArea;
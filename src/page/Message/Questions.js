import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import questionApi from '~/api/QuestionApi';
import styles from './Message.module.scss';
export default function Questions() {
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    const fetchQuestion = async () => {
      const questionList = await questionApi.getAll();
      setQuestion(questionList.question);
    };
    fetchQuestion();
  }, []);
  return (
    <Box sx={{ padding: '0 12px' }}>
      <ul className={styles.questionList}>
        {question.map((result) => (
          <li key={result.id} className={styles.question}>{result.content}</li>
        ))}
      </ul>
    </Box>
  );
}

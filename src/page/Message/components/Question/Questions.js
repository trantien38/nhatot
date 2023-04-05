import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import questionApi from '~/api/QuestionApi';
import styles from './Question.module.scss';

export default function Questions(props) {
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    const fetchQuestion = async () => {
      const questionList = await questionApi.getAll();
      setQuestion(questionList.question);
    };
    fetchQuestion();
  }, []);

  const handleSubmit = async (e) => {
    console.log(e.target.innerText);
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(e.target.innerText);
    }
  };

  return (
    <Box sx={{ padding: '0 12px' }}>
      <ul className={styles.questionList}>
        {question.map((result) => (
          <li key={result.id} className={styles.question} onClick={handleSubmit}>
            {result.content}
          </li>
        ))}
      </ul>
    </Box>
  );
}

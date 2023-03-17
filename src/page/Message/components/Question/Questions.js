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

  const handleSubmit = async (values) => {
    console.log(values);
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <Box sx={{ padding: '0 12px' }}>
      <ul className={styles.questionList}>
        {question.map((result) => (
          <li
            key={result.id}
            className={styles.question}
            onClick={handleSubmit}
          >
            {result.content}
          </li>
        ))}
      </ul>
    </Box>
  );
}

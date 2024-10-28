// src/TypingSpeedCheck.js
import React, { useRef, useState, useEffect } from 'react';

import { Box, Card, Button, TextField, Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

const TypingSpeedCheck = () => {
    const [sampleText, setSampleText] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [startTime, setStartTime] = useState<any>(null);
    const [endTime, setEndTime] = useState<any>(null);
    const [typingSpeed, setTypingSpeed] = useState<any>(null);
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
    const [isTyping, setIsTyping] = useState(false);
    const inputRef: any = useRef();
    const timerRef: any = useRef();

    // Array of words for random text generation
    const wordList = [
        'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog', 'keyboard', 'screen',
        'javascript', 'react', 'development', 'coding', 'algorithm', 'function', 'variable',
        'object', 'array', 'string', 'performance', 'optimization', 'testing', 'debugging',
        'component', 'hooks', 'state', 'props', 'library', 'framework', 'backend', 'frontend'
    ];

    // Function to generate random text
    const generateRandomText = (wordCount: number) => {
        const randomWords = [];
        for (let i = 0; i < wordCount; i += 1) {
            const randomIndex = Math.floor(Math.random() * wordList.length);
            randomWords.push(wordList[randomIndex]);
        }
        return randomWords.join(' ');
    };

    // Function to start the typing test
    const handleStart = () => {
        const randomText = generateRandomText(15); // Generate random text with 15 words
        setSampleText(randomText);
        setInputValue('');
        setTypingSpeed(null);
        setStartTime(new Date().getTime());
        setEndTime(null);
        setTimeLeft(60);
        setIsTyping(false);
        clearInterval(timerRef.current);
        inputRef.current.focus();
    };

    // Function to calculate typing speed when user finishes
    const handleInputChange = (e: { target: { value: any; }; }) => {
        const { value } = e.target;
        // Prevent updating if the input consists of only spaces
        if (value.trim() === "") {
            return;
        }
        setInputValue(value);

        if (!isTyping) {
            startTimer();
            setIsTyping(true);
        }

        if (value === sampleText) {
            setEndTime(new Date().getTime());
            clearInterval(timerRef.current);
        }
    };

    // Function to start the countdown timer
    const startTimer = () => {
        setStartTime(new Date().getTime());
        timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timerRef.current);
                    setEndTime(new Date().getTime());
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    // Generate random text on initial render
    useEffect(() => {
        const initialText = generateRandomText(15); // Generate random text with 15 words
        setSampleText(initialText);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Calculate typing speed in words per minute
    useEffect(() => {
        if (startTime && endTime) {
            const timeTaken = (endTime - startTime) / 1000; // in seconds
            const wordCount = sampleText.split(' ').length;
            const speed = (wordCount / timeTaken) * 60; // words per minute
            setTypingSpeed(speed.toFixed(2));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endTime, startTime]);

    // Function to get styled text based on the user's input
    const getStyledText = () => sampleText.split('').map((char, index) => {
        const isCorrect = inputValue[index] === char;
        const isExtra = index >= inputValue.length;
        const color = isCorrect ? 'green' : isExtra ? 'black' : 'red';

        return (
            <span key={index} style={{ color }}>
                {char}
            </span>
        );
    });

    return (
        <DashboardContent>
            <Card>
                <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h4" mb="20px" gutterBottom>
                        Typing Speed Check
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 2, fontSize: "18px", userSelect: "none" }}>
                        {getStyledText()}
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        value={inputValue}
                        onChange={handleInputChange}
                        inputRef={inputRef}
                        disabled={!!endTime || timeLeft === 0}
                        variant="outlined"
                        placeholder="Start typing here..."
                    />
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Time Left: {timeLeft} seconds
                        </Typography>
                        <Button variant="contained" onClick={handleStart} sx={{ mr: 2 }}>
                            Start Over
                        </Button>
                        {typingSpeed && (
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                Typing Speed: {typingSpeed} WPM
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Card>
        </DashboardContent>

    );
};

export default TypingSpeedCheck;

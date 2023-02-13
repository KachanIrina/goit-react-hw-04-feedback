import { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const hendleIncrement = option => {
    switch (option) {
      case 'good':
        setGood(setGood => setGood + 1);
        break;
      case 'neutral':
        setNeutral(setNeutral => setNeutral + 1);
        break;
      case 'bad':
        setBad(setBad => setBad + 1);
        break;
      default:
        throw new Error('wrong feedback option');
    }
  };

  const total = good + neutral + bad;
  const feedbackPercentage = Math.round((good / total) * 100);

  return (
    <div
      style={{
        height: '100vh',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        paddingLeft: 30,
      }}
    >
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={hendleIncrement}
        />
      </Section>

      <Section title="Statistics">
        {total ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={feedbackPercentage}
          />
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </div>
  );
}

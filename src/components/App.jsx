import React from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

export class App extends React.Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  hendleIncrement = option => {
    this.setState(prevState => ({
      [option]: prevState[option] + 1,
    }));
  };

  total = () => {
    return this.state.good + this.state.neutral + this.state.bad;
  };

  feedbackPercentage = () => {
    if (!this.total()) {
      return 0;
    }
    return Math.round((this.state.good / this.total()) * 100);
  };

  render() {
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
            options={Object.keys(this.state)}
            onLeaveFeedback={this.hendleIncrement}
          />
        </Section>

        <Section title="Statistics">
          {this.total() ? (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.total()}
              positivePercentage={this.feedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback"></Notification>
          )}
        </Section>
      </div>
    );
  }
}

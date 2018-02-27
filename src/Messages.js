import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

/**
 * NOTICE: just for illustration purposes, included 3 'components' 
 * in this single file to demonstrate how to perform a 
 * Query, Mutation, and Subscription against a GraphQL server
 *
 * Production: split components to their own file and import them in 
 * App.js or factor as you normally would in your apps
 */


/**
 * Returns JSX list of messages
 * @param  {Object} options.data: {            messages } list of Message objects
 * @return {JSX}               JSX unordered list of messages
 */
const MessageList = ({ data: { messages } }) => {
  return (
    <div>
      <ul>{messages && messages.map(message => <li key={message.id}>{message.content}</li>)}</ul>
    </div>
  );
}

/**
 * Returns JSX div with message content
 * @param  {Object} options.data: {            messageAdded } message object
 * @return {JSX}               JSX div with message content
 */
const Message = ({ data: { messageAdded } }) => {
	return (
		<div>
		{messageAdded && messageAdded.content}
		</div>
	)
}

/**
 * Renders JSX form elements with input to add message
 */
class AddMessage extends Component {
	state = {
		message: ''
	}

	handleSubmit = (e) => {
		console.log(`Submitting message ${this.state.message}`)
		this.props.mutate({
			variables: { message: this.state.message }
		})
			.then(data => {
				console.log(`Got data`, data);
			})
			.catch(error => {
				console.error(`There was an error sending query`, error);
			})
	}

	handleChange = (e) => {
		console.log(`Updating message to ${e.target.value}`);
		this.setState({message: e.target.value});
	}

	render() {
		return (
			<div>
				<label>Message:</label>
				<input type="text" name="message" value={this.state.message} onChange={this.handleChange} />
				<button onClick={this.handleSubmit}>Add Message</button>
			</div>
		)
	}
}


/**
 * Query Constants
 */
const messagesQuery = gql`
  query MessagesQuery {
    messages {
      id
      content
    }
  }
`;

const subscriptionQuery = gql`
  subscription Notification {
    messageAdded {
      id
      content
    }
  }
`;

const addMessageQuery = gql`
  mutation AddMessage($message: String!) {
    addMessage(message: $message)
  }
`


/**
 * HOC performs GraphQL query to get list of messages
 * @type {Object}
 */
const Query = graphql(messagesQuery)(MessageList);

/**
 * HOC performs GraphQL query to subscribe to a feed
 * @type {Object}
 */
const Subscription = graphql(subscriptionQuery)(Message);

/**
 * HOC performs GraphQL mutation to insert new records
 * @type {Object}
 */
const Mutation = graphql(addMessageQuery)(AddMessage);


export {Query, Subscription, Mutation};


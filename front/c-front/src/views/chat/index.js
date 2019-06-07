import React, { Component } from 'react';
import TwilioChat from 'twilio-chat';

export default class Chat extends Component {
  state = {
    messages: [],
    newMessage: ''
  };

  channelName = 'general3';

  componentDidMount = async () => {
    const config = { identity: 'audea', deviceId: '123' };
    const rawTwil = await fetch('http://10.1.10.139:4321/twil', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(config) // DEVICE ID AND IDENTIY NEED TO BE RELATED TO USER
    });
    const twilToken = await rawTwil.json();

    await this.initializeChat(twilToken.token);
  };

  sendMessage = () => {
    const message = this.state.newMessage;
    this.setState({ newMessage: '' });
    this.channel.sendMessage(message);
  };

  keyDown = e => (e.key === 'Enter' ? this.sendMessage(e) : null);

  initializeChat = token => {
    this.chatClient = new TwilioChat(token);
    this.chatClient.initialize().then(this.clientInitiated.bind(this));
  };

  clientInitiated = () => {
    this.setState({ chatReady: true }, () => {
      this.chatClient
        .getChannelByUniqueName(this.channelName)
        .then(channel => (channel ? (this.channel = channel) : null))
        .catch(err =>
          err.body.code === 50300
            ? this.chatClient.createChannel({
              uniqueName: this.channelName
            })
            : console.log('err', err)
        )
        .then(channel => {
          this.channel = channel;

          console.log('channel state', this.channel.state);
          return this.channel.state.status !== 'joined'
            ? this.channel.join()
            : null;
        })
        .then(() => {
          this.channel.getMessages().then(this.messagesLoaded);
          this.channel.on('messageAdded', this.messageAdded);
        });
    });
  };

  messagesLoaded = messagePage =>
    this.setState({ messages: messagePage.items });

  messageAdded = message =>
    this.setState(prevState => ({
      messages: [...prevState.messages, message]
    }));

  onMessageChanged = event => this.setState({ newMessage: event.target.value });

  render() {
    const { messages, newMessage } = this.state;
    const { sendMessage, onMessageChanged } = this;

    return (
      <>
        <div>
          {messages.map(m => (
            <div>
              <div>{m.author}:&nbsp;</div>
              <div>{m.body}</div>
            </div>
          ))}
        </div>
        <div>
          <div>
            <input
              placeholder="say something..."
              onKeyDown={e => this.keyDown(e)}
              onChange={onMessageChanged}
              value={newMessage}
              name="message"
            />

            <button onClick={sendMessage}>SEND</button>
          </div>
        </div>
      </>
    );
  }
}

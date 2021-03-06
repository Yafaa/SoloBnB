import * as MessageAPIUtil from '../util/message_api_util';

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export const receiveMessages = messages => {
  return {
    type: RECEIVE_MESSAGES,
    messages
  }
}

export const receiveMessage = message => {
  return {
    type: RECEIVE_MESSAGE,
    message
  }
}

export const fetchMessages = id => {
  return dispatch => {
    return MessageAPIUtil.fetchMessages(id)
      .then(messages => {
        return dispatch(receiveMessages(messages))
      })
  }
}




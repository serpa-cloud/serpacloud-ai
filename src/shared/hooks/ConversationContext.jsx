// @flow
import { createContext, useReducer, useContext } from 'react';

// Estado inicial
const initialState = {
  conversation: null,
  conversationRef: null,
};

// Reducer
function conversationReducer(state, action) {
  switch (action.type) {
    case 'SET_CONVERSATION_DATA':
      return {
        ...state,
        conversation: action.payload.conversation,
        conversationRef: action.payload.conversationRef,
      };
    case 'RESET_CONVERSATION':
      return {
        ...state,
        conversation: null,
        conversationRef: null,
      };
    default:
      return state;
  }
}

// Crear el contexto
const ConversationContext = createContext();

export function useConversationContext(): any {
  const context = useContext(ConversationContext);

  if (!context) {
    throw new Error('useConversationContext must be used within a ConversationProvider');
  }

  return context;
}

type Props = {|
  children: React$Node,
|};

// Proveedor del contexto
export default function ConversationProvider({ children }: Props): React$Node {
  const [state, dispatch] = useReducer(conversationReducer, initialState);

  const setConversationData = ({ conversation, conversationRef }) => {
    dispatch({
      type: 'SET_CONVERSATION_DATA',
      payload: {
        conversation,
        conversationRef,
      },
    });
  };

  const resetConversation = () => {
    dispatch({ type: 'RESET_CONVERSATION' });
  };

  return (
    <ConversationContext.Provider
      value={{
        conversation: state.conversation,
        conversationRef: state.conversationRef,
        setConversationData,
        resetConversation,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

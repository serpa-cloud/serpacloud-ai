// eslint-disable-next-line import/no-extraneous-dependencies
import io from 'socket.io-client';
import { createContext, useContext, useReducer, useEffect, useRef, useState } from 'react';

// Define el contexto
const SocketContext = createContext();

// Define el reducer para manejar el estado
const socketReducer = (state, action) => {
  if (action.type === 'SET_PROJECT_SUGGESTIONS') {
    const projects = { ...state.projects };
    const { payload } = action;

    projects[payload.projectId] = projects[payload.projectId] || {};
    projects[payload.projectId].suggestions = payload.suggestions.split('\n').filter(Boolean);

    return {
      ...state,
      projects,
    };
  }

  if (action.type === 'APPLY_SUGGESTION') {
    const projects = { ...state.projects };
    const { payload } = action;

    projects[payload.projectId] = projects[payload.projectId] || {};
    projects[payload.projectId].suggestions = projects[payload.projectId].suggestions.filter(
      (s) => s !== payload.suggestion,
    );

    return {
      ...state,
      projects,
    };
  }
  return {
    ...state,
  };
};

// Estado inicial
const initialState = {
  projects: {},
};

// Proveedor del contexto
export default function SocketProvider({ children }: { children: React$Node }): React$Node {
  const [state, dispatch] = useReducer(socketReducer, initialState);

  // Usa useRef para mantener la referencia de socket
  const socketRef = useRef(null);

  // Conexión del socket
  useEffect(() => {
    socketRef.current = io('http://localhost:7702', {
      extraHeaders: {
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWV3ZXIiOiJVc2VyOjA4M2QxNzgwLTJlNTYtMTFlZC04Y2MxLWViYWQyZDJkZmFjNyIsImlzc3VlciI6InllbGxvdy1jb2RlIiwiYXVkaWVuY2UiOiJyb2xlOmFkbWluIiwibmFtZSI6IkVtaWxpYSIsImVtYWlsIjoiZW1pbGlhQHllbGxvd2NvZGUuaW8iLCJ1c2VybmFtZSI6ImVtaWxpYSIsImxhc3RuYW1lIjoiR29uesOhbGV6Iiwic2lnbmVkTmFtZXNwYWNlIjoiT3JnOmM1YTQ1OTEwLTJlNWEtMTFlZC04Y2MxLWViYWQyZDJkZmFjNyIsImlhdCI6MTcyOTExMDM2MiwiZXhwIjoxNzYwNjQ2MzYyLCJhdWQiOiJyb2xlOmFkbWluIiwiaXNzIjoieWVsbG93LWNvZGUiLCJqdGkiOiJVc2VyOjA4M2QxNzgwLTJlNTYtMTFlZC04Y2MxLWViYWQyZDJkZmFjNyJ9.h0tjyxNuNXErxfn1xt9sadp6TPwcjnfZWblJ4RJ9CpPQGteyAf-vF6Fsynf7Jjth8F8mmjUyUPbmB5p1L9xn1x2ZsQG3ND5xxHsu0x9EDAHjgVoeyEGMpzKvIobHxgGSiJcgjXgrZf8zQnr1j5aOsffBHaSCqKZ5EqjTwHTwiQcmJ3AzkO0FVm5eA8mJ9jhjDQFBMQ6tBxQXsNIMGHpb6XxGfN4i3N7sVZkYLpEBQZVCppZZJsjmQjYY2-XN6H3nF85fIJfWJ49YOK6DUoIUcQ5bh7TwnKr9jZ5r5tfgVN_HFO7JpL8RFRlDhYNG0gZYZ46-yELwNurNYw4GSCLQag`,
      },
    });

    // Limpia la conexión al desmontar el componente
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  function getSocket() {
    return socketRef.current;
  }

  return (
    <SocketContext.Provider value={{ state, dispatch, getSocket }}>
      {children}
    </SocketContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const useGenerateSuggestions = (projectId) => {
  const { getSocket, dispatch } = useSocketContext();

  return ({ summary }) => {
    const socket = getSocket();
    socket.emit('generateSuggets', { summary });

    socket.on('generateSuggets', (data) => {
      dispatch({
        type: 'SET_PROJECT_SUGGESTIONS',
        payload: {
          projectId,
          suggestions: data,
        },
      });
    });
  };
};

export const useApplySuggestion = (projectId) => {
  const [pending, setPending] = useState(false);
  const { getSocket, dispatch } = useSocketContext();

  const applySuggestion = ({ suggestion, summary, onCompleted }) => {
    setPending(true);
    const socket = getSocket();

    socket.emit('applySuggestion', { suggestion, summary });

    socket.on('applySuggestion', (data) => {
      setPending(false);
      onCompleted(data);

      dispatch({
        type: 'APPLY_SUGGESTION',
        payload: {
          projectId,
          suggestion,
        },
      });
    });
  };

  return [applySuggestion, pending];
};

export const useApplyTemplate = () => {
  const [pending, setPending] = useState(false);
  const { getSocket } = useSocketContext();

  const applyTemplate = ({ templateId, onCompleted }) => {
    setPending(true);
    const socket = getSocket();

    socket.emit('applyTemplate', { templateId });

    socket.on('applyTemplate', (data) => {
      setPending(false);
      onCompleted(data);
    });
  };

  return [applyTemplate, pending];
};

export const useProjectInRealTime = (projectId) => {
  const { state } = useSocketContext();

  return state.projects[projectId];
};

export const useAnswer = () => {
  const { getSocket } = useSocketContext();

  return ({ ask, answer, project }) => {
    const socket = getSocket();
    socket.emit('answer', { ask, answer, project });
  };
};

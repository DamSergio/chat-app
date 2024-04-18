/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useAuthContext } from "./AuthContext";
import io, { Socket } from "socket.io-client";

export const SocketContext = React.createContext({
  socket: {} as Socket | null,
  onlineUsers: [] as string[],
});

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return React.useContext(SocketContext);
};

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = React.useState([]); // list of users._id who are online
  const { authUser } = useAuthContext();

  React.useEffect((): any => {
    if (authUser) {
      const socket = io("http://localhost:5000", {
        query: { userId: authUser._id },
      });
      setSocket(socket);

      // socket.on() is used to listen for events. Can be used both on the server and the client side.
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

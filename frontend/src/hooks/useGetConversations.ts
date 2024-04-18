import * as React from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = React.useState(false);
  const [conversations, setConversations] = React.useState([]);

  React.useEffect(() => {
    const getConversations = async () => {
      setLoading(true);

      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data.data.users);
      } catch (error) {
        toast.error((error as Error).message);
      }

      setLoading(false);
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;

import AlertError from "../components/AlertError.jsx";


const ShowErrorAlert = ({ messages }) => {
    if (Array.isArray(messages)) {
      return messages.map((message, index) => (
        <AlertError key={index} message={message} />
      ));
    }
    return <AlertError message={messages} />;
  };


export default ShowErrorAlert;
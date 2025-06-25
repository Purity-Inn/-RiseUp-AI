import LLM "mo:llm";

persistent actor {

  public func prompt(prompt : Text) : async Text {
    if (prompt == "") {
      return "Please provide a valid prompt.";
    };
    let result : Text = await LLM.prompt(#Llama3_1_8B, prompt);
    return result;
  };

  public func chat(messages : [LLM.ChatMessage]) : async Text {
    if (messages.size() == 0) {
      return "Please send a message to start the chat.";
    };

    let session = LLM.chat(#Llama3_1_8B).withMessages(messages);
    let response = await session.send();

    return switch (response.message.content) {
      case (?text) text;
      case null "Hmm, I couldn't come up with a response. Try again!";
    };
  };
}


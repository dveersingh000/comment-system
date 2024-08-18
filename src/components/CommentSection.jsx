import React, { useState } from "react";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import "./CommentSection.css"; // Import the new CSS file

const CommentSectionComponent = ({ currentUser }) => {
  const [data] = useState([]);

  return (
    <div className="comment-section-container">
      <CommentSection
        customNoComment={() => {
          return <div className="no-comments">No comments yet</div>;
        }}
        currentUser={currentUser}
        advancedInput={true}
        hrStyle={{ border: "0.5px solid #ff0072" }}
        commentData={data}
        logIn={{
          loginLink: "http://localhost:3001/",
          signupLink: "http://localhost:3001/"
        }}
        customImg="https://images.unsplash.com/photo-1611605698335-8b1569810432?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGljb258ZW58MHx8MHx8fDA%3D"
        inputStyle={{ border: "1px solid rgb(208 208 208)" }}
        formStyle={{ backgroundColor: "white" }}
        submitBtnStyle={{
          border: "1px solid black",
          backgroundColor: "black",
          padding: "7px 15px"
        }}
        cancelBtnStyle={{
          border: "1px solid gray",
          backgroundColor: "gray",
          color: "white",
          padding: "7px 15px"
        }}
        replyInputStyle={{ borderBottom: "1px solid black", color: "black" }}
      />
    </div>
  );
};

export default CommentSectionComponent;

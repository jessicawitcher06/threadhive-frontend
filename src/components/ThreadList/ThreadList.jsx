import { useDispatch } from "react-redux";
import {
  upvoteThreadThunk,
  downvoteThreadThunk,
} from "../../reducers/threadListSlice";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import VoteButtons from "../Shared/VoteButtons";
import "./ThreadList.css";

export default function ThreadList({ threadsToDisplay }) {
  const dispatch = useDispatch();

  const handleUpvote = (threadId) => {
    dispatch(upvoteThreadThunk(threadId));
  };

  const handleDownvote = (threadId) => {
    dispatch(downvoteThreadThunk(threadId));
  };

  return (
    <Container fluid className="px-0">
      <ul className="list-unstyled" role="list">
      {threadsToDisplay.map((thread) => (
        <li key={thread._id} className="thread-card" role="listitem">
          <div className="thread-card-body">
            {/* Voting Section */}
            <div className="vote-section">
              <VoteButtons
                count={thread.voteCount}
                onUpvote={() => handleUpvote(thread._id)}
                onDownvote={() => handleDownvote(thread._id)}
                ariaLabel={thread.title}
              />
            </div>

            {/* Thread Info */}
            <div className="thread-content-section">
              <div className="thread-header">
                <h5 className="thread-title">{thread.title}</h5>
                <span className="subreddit-badge" aria-label={`Community: r/${thread.subreddit?.name || 'unknown'}`}>
                  r/{thread.subreddit?.name || "unknown"}
                </span>
              </div>
              <p className="thread-text">{thread.content}</p>
              <Link to={`/thread/${thread._id}`} className="view-thread-btn" aria-label={`View comments for ${thread.title}`}>
                💬 View Comments
              </Link>
            </div>
          </div>
        </li>
      ))}
      </ul>
    </Container>
  );
}

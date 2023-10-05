import React, { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp, FaCommentDots } from 'react-icons/fa';

import { StyledTag } from '../_elements/elements';
import { Container, ContentDiv, ForumCard } from './Forum/styles';
import ForumSideBar from '../components/Forum/ForumSideBar';
import { fetchWrapper } from '../_helpers';
import Comment from '../components/Forum/comment';
import CommentBox from '../components/Forum/CommentBox';
import { connect } from 'react-redux';
import { likeOnThread, unlikeOnThread } from '../_redux/actions/ActionForum';
import { FaBook } from 'react-icons/fa';

const Forum = ({ match, user, likeOnThread, unlikeOnThread }) => {
  const { threadId } = match.params;
  const [thread, setThread] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchWrapper.get(`threads/${threadId}`).then((res) => {
      setThread(res.thread);
      if (res.thread && res.thread.likes.length) {
        const index = res.thread.likes.findIndex((like) => like.user === user._id);
        if (index !== -1) {
          setIsLiked(true);
        }
      }
    });
  }, []);

  const refreshComments = () => {
    console.log('hello refers');
    fetchWrapper.get(`threads/${threadId}`).then((res) => {
      setThread(res.thread);
      if (res.thread && res.thread.likes.length) {
        const index = res.thread.likes.findIndex((like) => like.user === user._id);
        if (index !== -1) {
          setIsLiked(true);
        }
      }
    });
  };

  const handleLikeThread = async (id) => {
    if (isLiked)
      unlikeOnThread(id).then((res) => {
        if (res) {
          setIsLiked(false);
          if (thread) {
            setThread((prev) => ({ ...prev, likeCount: prev.likeCount - 1 }));
          }
        }
      });
    else
      likeOnThread(id).then((res) => {
        if (res) {
          setIsLiked(true);
          if (thread) {
            setThread((prev) => ({ ...prev, likeCount: prev.likeCount + 1 }));
          }
        }
      });
  };

  return (
    <Container>
      <ContentDiv>
        <div style={{ flex: '65%', height: '100%', wordBreak: 'break-all' }}>
          <div>
            {thread && (
              <ForumCard key={thread._id}>
                <span
                  style={{
                    width: 55,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <FaBook color="#ff6602" fontSize={32} />
                </span>
                <div>
                  <h4 style={{ fontWeight: '400', fontSize: 32, color: '#ff6602' }}>{thread.title}</h4>
                  <p dangerouslySetInnerHTML={{ __html: thread.body }} />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: '.5rem 0',
                      fontSize: '14px',
                      color: 'gray',
                    }}
                  >
                    <p style={{ marginRight: '.5rem', color: 'red' }}>
                      <FaCommentDots />
                      <span style={{ marginLeft: '.2rem' }}>{thread.commentCount} answers</span>
                    </p>
                    <p
                      style={{ marginRight: '.5rem', color: !isLiked ? 'black' : 'blue', cursor: 'pointer' }}
                      onClick={() => handleLikeThread(thread._id)}
                    >
                      {isLiked ? <FaArrowDown /> : <FaArrowUp />}

                      <span style={{ marginLeft: '.2rem' }}>{thread.likeCount} votes</span>
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      fontSize: '12px',
                      color: 'gray',
                    }}
                  >
                    {thread.tag && thread?.tag.map((tag) => <StyledTag key={tag}>{tag}</StyledTag>)}
                  </div>
                </div>
              </ForumCard>
            )}
          </div>
          <CommentBox threadId={threadId} refreshComments={refreshComments} />
          {thread && <Comment comments={thread.comments} />}
        </div>
        <ForumSideBar />
      </ContentDiv>
    </Container>
  );
};
const mapStateToProps = (state) => ({ user: state.user.user });

export default connect(mapStateToProps, { likeOnThread, unlikeOnThread })(Forum);

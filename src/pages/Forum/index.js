import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaArrowUp, FaCommentDots, FaBook } from 'react-icons/fa';

import { StyledTag } from '../../_elements/elements';
import { getAllThreads } from '../../_redux/actions/ActionForum';
import { Container, Navigation, NavigationLink, ContentDiv, ForumCard } from './styles';
import ForumSideBar from '../../components/Forum/ForumSideBar';

const Forum = ({ getAllThreads, threads }) => {
  console.log(threads);
  useEffect(() => {
    getAllThreads('');
  }, []);
  return (
    <Container>
      <Navigation>
        <ul>
          <NavigationLink onClick={() => getAllThreads('sort=-createdAt')}>Latest</NavigationLink>
          <NavigationLink onClick={() => getAllThreads('commentCount=0')}>Unanswered</NavigationLink>
          <NavigationLink onClick={() => getAllThreads('sort=-commentCount,-likeCount')}>Trending</NavigationLink>
        </ul>
      </Navigation>

      <ContentDiv>
        <div style={{ flex: '65%', height: '100%' }}>
          <div>
            {threads.map((thread) => (
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
                  <Link to={`/forum/${thread._id}`}>
                    <h4 style={{ fontWeight: '400', color:"#ff6602" }}>{thread.title}</h4>
                  </Link>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: '.5rem 0',
                      fontSize: '14px',
                      color: 'gray',
                    }}
                  >
                    <p style={{ marginRight: '.5rem' }}>
                      <FaCommentDots />
                      <span style={{ marginLeft: '.2rem' }}>{thread.commentCount} answers</span>
                    </p>
                    <p style={{ marginRight: '.5rem' }}>
                      <FaArrowUp /> <span style={{ marginLeft: '.2rem' }}>{thread.likeCount} likes</span>
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
            ))}
          </div>
        </div>
        <ForumSideBar />
      </ContentDiv>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  threads: state.thread.threads,
});

export default connect(mapStateToProps, { getAllThreads })(Forum);

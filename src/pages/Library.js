/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import { Categories, CategoryForSelect } from '../_data/data';

import { Card } from '../_elements/card/Card';
import H1 from '../_elements/H1/H1';
import { fetchWrapper, shuffleThis } from '../_helpers';
import { StyledButtonPrimary } from '../_elements/button/Button';

const StyledLibraryContainer = styled.div`
  background-color: ${(props) => props.theme.pageBackground};
  .content {
    min-height: 90vh;
    padding-top: 1em;
    display: flex;
    flex-direction: column;
    .headerDiv {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1em;
    }
    .bodyDiv {
      flex: 9;
      display: flex;
      .sideBarDiv {
        max-width: 18rem;
        flex: 1;
        background: ${(props) => props.theme.bg_secondaryColor};
        padding: 2em 0;
        border-radius: 12px;
        h2 {
          font-size: 1.2rem;
          color: ${(props) => props.theme.titleColor};
          padding: 0.5em;
        }
        hr {
          width: 90%;
          border: 2px solid ${(props) => props.theme.pageBackground};
          margin-left: 0.5em;
        }
        .categoryBtn {
          color: ${(props) => props.theme.titleColor};
          background-color: ${(props) => props.theme.pageBackground};

          margin: 0 0.5em 0.5em;
          font-size: 1.3rem;
          border-radius: 5px;
          padding: 0.5em;
          transition: background-color 350ms, color 350ms, transform 350ms;
        }
        .catactive {
          cursor: default;
          background-color: ${(props) => props.theme.titleColor};
          color: white;
          pointer-events: none;
        }
        .catnotactive {
          :hover {
            background-color: ${(props) => props.theme.titleColor};
            color: white;
            transform: translateY(-3px);
            box-shadow: 0px 4px 4px 2px #cccccc69;
          }
          :active {
            transform: translateY(0);
            box-shadow: none;
          }
        }
      }
      .mainContent {
        flex: 5;
        margin-left: 2em;
        overflow-y: auto;
        @media screen and (max-width: 740px) {
          flex: 3;
          margin-left: 1em;
        }
        .main {
          height: 100%;
          display: grid;
          grid-gap: 1rem;
          grid-template-columns: repeat(auto-fit, minmax(15rem, 280px));
          justify-content: center;
          background: ${(props) => props.theme.bg_secondaryColor};
          padding: 2em 0;
          border-radius: 12px;
          overflow-y: auto;
          @media screen and (max-width: 705px) {
            grid-template-columns: repeat(auto-fit, minmax(8rem, 160px));
            grid-gap: 0.5rem;
          }
        }
      }
    }
  }
`;

export const Sections = ['For You', 'Newly Added', 'Explore'];
const Library = () => {
  let { name } = useParams();
  const [Name, setName] = useState(name);
  const [categoryBooks, setCategoryBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setName(name);
    let genreObj = CategoryForSelect.find((category) => category.label === name);
    const getCategoryBooks = async () => {
      try {
        setIsLoading(true);
        let response = await fetchWrapper.get(`userBook/category/${genreObj.value}?limit=50`);
        let results = response.results;

        let books = results.reduce((accumulator, currentValue) => {
          let userBook = currentValue.userbook.map((book) => {
            return {
              ...book,
              book: {
                title: currentValue.title,
              },
            };
          });
          return [...accumulator, ...userBook];
        }, []);

        console.log(books, 'books');
        setCategoryBooks(books);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    const getAlgorithmizedBooks = async () => {
      try {
        setIsLoading(true);
        let results;
        if (name === 'For You') {
          let url = `userBook/recommend/books?limit=50`;
          const response = await fetchWrapper.get(url);
          console.log(response, 'response')
          results = response.results.reduce((accumulator, currentValue) => {
            let userBook = currentValue.userbook.map((book) => {
              return {
                ...book,
                book: {
                  title: currentValue.title,
                },
              };
            });
            return [...accumulator, ...userBook];
          }, []);
        } else {
          let response = await fetchWrapper.get(`userBook?limit=50`);
          results = response.data;
        }

        setCategoryBooks(shuffleThis(results));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    if (genreObj?.value) {
      getCategoryBooks();
    } else {
      getAlgorithmizedBooks();
    }
  }, [name]);

  const handleSearchBook = async () => {
    try {
      setIsLoading(true);
      let response = await fetchWrapper.get(`userBook?limit=50`);
      console.log(response, 'response');
      let data = response.data;
      data = data.filter((book) => book.book.title.toLowerCase().includes(searchText.toLocaleLowerCase()));
      console.log(data, 'data');
      setCategoryBooks(data);
      setName('Search');
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <StyledLibraryContainer>
      <div className="container">
        <div className="content">
          <div className="headerDiv">
            <H1>{Name}</H1>
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <input
                css={css`
                  height: 100%;
                  font-size: 1.8rem;
                  border: 2px solid orange;
                  padding: 0 0.5rem;
                  border-top-left-radius: 5px;
                  border-bottom-left-radius: 5px;
                  outline: none;
                `}
                value={searchText}
                onChange={handleSearchText}
              />
              <StyledButtonPrimary onClick={handleSearchBook}>Search</StyledButtonPrimary>
            </div>
          </div>
          <div className="bodyDiv">
            <div className="sideBarDiv">
              <h2>Sections</h2>
              {Sections.map((section, index) => {
                return (
                  <Link
                    className={`h-${section}`}
                    key={index}
                    to={`/category/${section}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className={`categoryBtn text ${name === section ? 'catactive' : 'catnotactive'}`}>
                      {section}
                    </div>
                  </Link>
                );
              })}
              <hr />
              <h2>Categories:</h2>
              {Categories.map((category, index) => {
                return (
                  <Link
                    className={`h-${category}`}
                    key={index}
                    to={`/category/${category}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className={`categoryBtn text ${name === category ? 'catactive' : 'catnotactive'}`}>
                      {category}
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="mainContent">
              <div className="main">
                {isLoading ? (
                  <Fragment>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                  </Fragment>
                ) : categoryBooks.length ? (
                  categoryBooks?.map((book) => <Card key={book._id} book={book} />)
                ) : (
                  <div
                    css={css`
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      font-size: 2rem;
                      color: gray;
                    `}
                  >
                    {' '}
                    No Books Yet{' '}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledLibraryContainer>
  );
};
export default Library;

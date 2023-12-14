import styled from "styled-components";
import React from "react";

interface ItemProps {
    icon: any;
    text: any;

}
const Item  : React.FC<ItemProps> = ({ icon, text }) => {
    return (
        <Wrapper>
            <span className='icon'>{icon} </span>
            <span className='text'>{text} </span>
        </Wrapper>
    );
};
export default Item;
const Wrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;

  .icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--grey-400);
    }
  }
  .text {
    letter-spacing: var(--letterSpacing);
  }
`;
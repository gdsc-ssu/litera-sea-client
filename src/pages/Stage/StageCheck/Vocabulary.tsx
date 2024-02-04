import styled from "styled-components";
import StateStage from "@/components/StateStage/StateStage";
import Problem from "@/components/Problem/Problem";
import InputComponent from "@/components/AnswerInput/InputComponent";

const Vocabulary = () => {
  return (
    <Container>
      <TextBox>단어 </TextBox>
      <ProblemBox>
        <StateStage number={1} />

        <Problem title={"다음 단어의 의미를 설명하시오"}>
          <InputComponent placeholder="내 답변" />
        </Problem>
      </ProblemBox>
    </Container>
  );
};

const Container = styled.div`
  padding: 3rem;
  display: flex;
  justify-content: center;
  margin: auto;
`;

const TextBox = styled.div`
  margin-right: 100px;
  margin-top: 4rem;
  width: 30rem;
`;

const ProblemBox = styled.div``;

export default Vocabulary;
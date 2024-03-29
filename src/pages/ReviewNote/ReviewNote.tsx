import styled from "styled-components";
import ReviewList, * as RLstyled from "@/components/List/ReviewList";
import { COLORS } from "@/styles/colors";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import FlexContainer from "@/components/common/flex-container";
import { reviewApi } from "@/apis/axiosInstance";

type solveDTO = {
  article: string;
  answer: string;
  articleCategory: string;
  userSummary: string;
};

const ReviewNote = () => {
  const today = new Date();
  const [selectDate, setSelectDate] = useState<Date>(today);
  const [solveIdList, setSolveIdList] = useState<number[]>([]);
  const [solveDTO, setSolveDTO] = useState<solveDTO[]>([
    {
      article: "",
      answer: "",
      articleCategory: "",
      userSummary: "",
    },
  ]);

  useEffect(() => {
    reviewApi
      .loadReviewByCreateAt(selectDate.toISOString().slice(0, 10))
      .then((res) => {
        setSolveIdList(res.data);
        const promises = res.data.map((solveId: number) => {
          return reviewApi.loadReviewBySolvedId(solveId);
        });

        Promise.all(promises).then((res) => {
          const newData = res.map((res) => res.data);
          setSolveDTO(newData);
          console.log(newData);
        });
      });
  }, [selectDate]);

  return (
    <FlexContainer direction="column" alignItems="stretch">
      <div style={{ fontWeight: 600 }}>복습 노트</div>
      <FlexContainer
        direction="column"
        style={{ background: `${COLORS.boxBg}` }}
        padding={1.5}
        gap={1}
        alignItems="flex-start"
      >
        <StyledDatePicker
          dateFormat="yyyy.MM.dd"
          selected={selectDate}
          closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
          onChange={(date: Date) => setSelectDate(date)}
        />
        <ListBox direction="column">
          <ListTitle justifyContent="space-between" withBorder={false}>
            <RLstyled.NumberBox style={{ fontWeight: 600 }}>
              번호
            </RLstyled.NumberBox>
            <RLstyled.TitleBox style={{ fontWeight: 600 }}>
              제목
            </RLstyled.TitleBox>
            <RLstyled.ArrowBox />
          </ListTitle>
          {solveIdList.map((el, idx) => {
            return (
              <ReviewList
                key={idx}
                number={el}
                title={solveDTO[idx]?.article.slice(0, 50) + "..."}
              />
            );
          })}
        </ListBox>
      </FlexContainer>
    </FlexContainer>
  );
};

const ListBox = styled(FlexContainer).attrs({})`
  border: 1px solid ${COLORS.lightGray};
  border-radius: 0.8rem;
  padding: 1rem;
  background: ${COLORS.white};
`;

const ListTitle = styled(FlexContainer)`
  padding: 1rem 2rem 1.5rem 2rem;
  border-bottom: 1px solid ${COLORS.lightGray};
`;

const StyledDatePicker = styled(DatePicker)`
  font-size: 1.4rem;
  border: 1px solid ${COLORS.lightGray};
  font-weight: 400;
  padding: 20px;
  background-color: ${COLORS.white};
  border-radius: 0.8rem;
  color: ${COLORS.middleGray};
`;

export default ReviewNote;

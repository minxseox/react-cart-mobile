import React from "react";
import styles from "./CardList.module.css";
import { useNavigate } from "react-router-dom";

export default function CardList({ cards = [], onAddNew }) {
  const nav = useNavigate();

  return (
    <div className={styles.wrap}>
      {/* 상단바 */}
      <div className={styles.head}>
        <h2>보유카드</h2>
        <button className={styles.close} onClick={() => nav("/")}>
          ✕
        </button>
      </div>

      {/* 카드가 없을 때 */}
      {cards.length === 0 ? (
        <div className={styles.emptyBox} onClick={onAddNew}>
          <span>+</span>
          <p>새로운 카드를 등록해주세요.</p>
        </div>
      ) : (
        <>
          {/* 저장된 카드 프리뷰 */}
          {cards.map((c, i) => (
            <div key={i} className={styles.cardPreview}>
              <div className={styles.fakeCard}>
                <div className={styles.chip} />
                <div className={styles.rowTop}>
                  <span className={styles.number}>{c.numberMasked}</span>
                </div>
                <div className={styles.rowBottom}>
                  <span className={styles.owner}>{c.owner.toUpperCase()}</span>
                  <span className={styles.exp}>{c.exp}</span>
                </div>
              </div>
              <button className={styles.payBtn}>이 카드로 결제하기</button>
            </div>
          ))}

          {/* 카드 추가 타일 */}
          <div className={styles.addTile} onClick={onAddNew}>
            <span>+</span>
          </div>
        </>
      )}
    </div>
  );
}

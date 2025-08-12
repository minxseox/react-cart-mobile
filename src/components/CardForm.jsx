import React, { useState, useMemo } from "react";
import styles from "./CardForm.module.css";
import { useNavigate } from "react-router-dom";

const onlyDigits = (s) => s.replace(/\D/g, "");

export default function CardForm({ onSave }) {
  const nav = useNavigate();

  // 입력값 (숫자만 저장)
  const [numberRaw, setNumberRaw] = useState(""); // 16자리
  const [expRaw, setExpRaw] = useState(""); // 4자리 MMYY
  const [owner, setOwner] = useState("");
  const [cvc, setCvc] = useState(""); // 3자리
  const [pin1, setPin1] = useState(""); // 1자리
  const [pin2, setPin2] = useState(""); // 1자리

  // 표시용 파생 값들
  const numberGrouped = useMemo(() => {
    const d = onlyDigits(numberRaw).slice(0, 16);
    return d.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  }, [numberRaw]);

  const numberMasked = useMemo(() => {
    const d = onlyDigits(numberRaw).padEnd(16, "•").slice(0, 16);
    const g1 = d.slice(0, 4);
    const g2 = d.slice(4, 8);
    const g3 = "••••";
    const g4 = "••••";
    return `${g1} - ${g2} - ${g3} - ${g4}`;
  }, [numberRaw]);

  const expPretty = useMemo(() => {
    const d = onlyDigits(expRaw).slice(0, 4);
    if (d.length <= 2) return d;
    return `${d.slice(0, 2)} / ${d.slice(2)}`;
  }, [expRaw]);

  // 입력 핸들러
  const onChangeNumber = (e) =>
    setNumberRaw(onlyDigits(e.target.value).slice(0, 16));
  const onChangeExp = (e) => setExpRaw(onlyDigits(e.target.value).slice(0, 4));
  const onChangeCvc = (e) => setCvc(onlyDigits(e.target.value).slice(0, 3));
  const onChangePin1 = (e) => setPin1(onlyDigits(e.target.value).slice(0, 1));
  const onChangePin2 = (e) => setPin2(onlyDigits(e.target.value).slice(0, 1));

  // 검증 + 저장
  const handleSubmit = (e) => {
    e.preventDefault();
    const n = onlyDigits(numberRaw);
    const exp = onlyDigits(expRaw);
    if (n.length !== 16) return alert("카드 번호 16자리로 입력해 주세요.");
    const mm = +exp.slice(0, 2);
    if (exp.length !== 4 || mm < 1 || mm > 12)
      return alert("만료일은 MMYY(예: 0427) 형식이에요.");
    if (!owner.trim()) return alert("카드 소유자 이름을 입력해 주세요.");
    if (cvc.length !== 3) return alert("CVC는 3자리 숫자예요.");
    if (pin1.length !== 1 || pin2.length !== 1)
      return alert("카드 비밀번호 앞 두 자리만 입력해 주세요.");

    const saved = {
      numberMasked,
      owner: owner.trim(),
      exp: `${exp.slice(0, 2)} / ${exp.slice(2)}`,
    };
    onSave(saved); // App.jsx에서 저장 후 /cards로 이동 처리됨
  };

  return (
    <div className={styles.page}>
      {/* 상단바 */}
      <div className={styles.topbar}>
        <button className={styles.navBtn} onClick={() => nav(-1)}>
          ‹
        </button>
        <h2>카드 추가</h2>
        <button className={styles.navBtn} onClick={() => nav("/")}>
          ✕
        </button>
      </div>

      {/* 카드 프리뷰 */}
      <div className={styles.previewWrap}>
        <div className={styles.card}>
          <div className={styles.chip} />
          <div className={styles.cardNumRow}>
            {numberRaw ? numberMasked : "1111 2222 •••• ••••"}
          </div>
          <div className={styles.cardBottom}>
            <span className={styles.cardOwner}>
              {(owner || "JUN").toUpperCase()}
            </span>
            <span className={styles.cardExp}>{expPretty || "04 / 21"}</span>
          </div>
        </div>
      </div>

      {/* 폼 */}
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* 카드 번호 */}
        <label className={styles.label}>카드 번호</label>
        <input
          type="text"
          value={numberGrouped}
          onChange={onChangeNumber}
          placeholder="1111 2222 3333 4444"
          className={styles.input}
          inputMode="numeric"
        />

        {/* 만료일 */}
        <label className={styles.label}>만료일</label>
        <input
          type="text"
          value={expPretty}
          onChange={onChangeExp}
          placeholder="MM / YY"
          className={styles.inputSm}
          inputMode="numeric"
        />

        {/* 카드 소유자 이름 */}
        <div className={styles.rowBetween}>
          <label className={styles.label}>카드 소유자 이름</label>
          <span className={styles.counter}>{owner.length} / 30</span>
        </div>
        <input
          type="text"
          value={owner}
          onChange={(e) => {
            if (e.target.value.length <= 30) setOwner(e.target.value);
          }}
          placeholder="카드에 표시된 이름과 동일하게 입력하세요."
          className={styles.input}
        />

        {/* CVC + 도움 아이콘 */}
        <div className={styles.rowBetween}>
          <label className={styles.label}>보안 코드(CVC/CVV)</label>
          <button
            type="button"
            className={styles.helpIcon}
            title="카드 뒷면의 3자리 숫자"
          >
            ?
          </button>
        </div>
        <input
          type="text"
          value={cvc}
          onChange={onChangeCvc}
          placeholder="•••"
          className={styles.inputSm}
          inputMode="numeric"
        />

        {/* 카드 비밀번호 */}
        <label className={styles.label}>카드 비밀번호</label>
        <div className={styles.pinRow}>
          <input
            type="password"
            value={pin1}
            onChange={onChangePin1}
            maxLength={1}
            className={styles.pinBox}
            inputMode="numeric"
          />
          <input
            type="password"
            value={pin2}
            onChange={onChangePin2}
            maxLength={1}
            className={styles.pinBox}
            inputMode="numeric"
          />
          <span className={styles.pinDot}>•</span>
          <span className={styles.pinDot}>•</span>
        </div>

        <button className={styles.submit} type="submit">
          작성 완료
        </button>
      </form>
    </div>
  );
}

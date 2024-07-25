import React, { useState } from 'react';
import cls from './Range.module.scss'; // Предполагается, что вы создадите файл стилей для кастомизации


interface IProps{
  setFilterValue:(start:number,end:number)=>void
}
const CustomRange = ({setFilterValue}:IProps) => {
  // Инициализация состояния для хранения позиций ползунков
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(99999);

  // Функция для обновления позиции начального ползунка
  const handleStartChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setStart(value);
      setFilterValue(start,end)
    }
  };

  // Функция для обновления позиции конечного ползунка
  const handleEndChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setEnd(value);
      setFilterValue(start,end)
    }
  };

  // Функция для отображения текущего диапазона
  const displayRangeStart = () => {
    return `${start}`;
  };
  const displayRangeEnd = () => {
    return `${end}`;
  };

  return (
    <div className={cls.customRangeWrapper}>
        <div className={cls.customRange}>
        <input
          type="range"
          min="0"
          max="50000"
          value={start}
          onChange={handleStartChange}
          className={cls.customRangeInput}
        />
        <input
          type="range"
          min="50000"
          max="100000"
          value={end}
          onChange={handleEndChange}
          className={cls.customRangeInput}
        />
      </div>
      <div className={cls.customTextWrapper}>
        <p className={cls.customRangeText}>{displayRangeStart()}</p>
        <p className={cls.customRangeText}>{displayRangeEnd()}</p>
      </div> 
    </div>
    
  );
};

export default CustomRange;
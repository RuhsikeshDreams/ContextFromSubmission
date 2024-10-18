import { useContext, useState } from 'react';
import { TodoContext } from '../Context/TodoContext';

const SubmissionComponent = () => {
  const { state } = useContext(TodoContext);
  const [openIndex, setOpenIndex] = useState(null);
  const [sortedData, setSortedData] = useState(state.accordion);
  const [isSortedAsc, setIsSortedAsc] = useState(true);
  const handleSortByDate = () => {
    const sorted = [...sortedData].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return isSortedAsc ? dateA - dateB : dateB - dateA;
    });
    setSortedData(sorted);
    setIsSortedAsc(!isSortedAsc);
  };

  return (
    <div className='submission-block'>
          <h1>Submissions</h1>
      <button
        className="toggle-button-short"
        onClick={handleSortByDate}
      >
        <p>{!isSortedAsc ? 'Old Date' : 'latest Date'}</p>
      </button>
      {sortedData.map((item, index) => (
        <div
          key={index}
          style={{ marginBottom: '10px' }}
        >
          <div className="">
            <div className='accordion'
          
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <p>{item.date.split('T').join(' ').split('.')[0]}</p>
              <span className="material-symbols-outlined">
                {openIndex === index
                  ? 'remove'
                  : 'add'}
              </span>
            </div>
          </div>
          {openIndex === index && (
            <ul className='content-list' >
              {item.list.map((listItem, i) => (
                <li key={i}>{listItem}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default SubmissionComponent;

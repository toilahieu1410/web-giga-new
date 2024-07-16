import React, { useState } from 'react'
import { Card, CardTitle, CardHeader, CardBody } from 'reactstrap'
import { faPlus, faMinus, faQuestion, faQuestionCircle, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Helmet } from 'react-helmet'

const Cauhoi = (props) => {

  const { questions } = props

  const ldJson = {   
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(item => (
      {
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text":item.answer
        }
        }
    )),
    
  }
  return (
    <div className='frequently-questions mt-3'>
      {questions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className='mb-0'><h5 className='mb-0 text-uppercase'>Câu hỏi thường gặp</h5></CardTitle>
          </CardHeader>
          <CardBody className='pt-0'>
            {
              questions.map(item => (
                <Item item={item} />
              ))
            }
          </CardBody>
          <script type="application/ld+json">
          {JSON.stringify(ldJson)}
        </script>
        </Card>
      )}
    </div>
  )
}

export default Cauhoi

const Item = (props) => {

  const { item } = props

  const [showAnswer, setShowAnswer] = useState(true)

  const Linkify = ({ text, pattern, formatter }) => {
    const __html = text.replace(pattern, formatter);

    return <div dangerouslySetInnerHTML={{ __html }} />;
  };

  const text = item.answer;
  const pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const formatter = str => `<a href="${str}" style="color:#3590de" target="_blank">${str}</a>`;

  return (
    <div className='card-question'>
      <div className='card-question-item position-relative'>
        <div className='d-flex align-items-center justify-content-between mb-2 cursor-pointer' onClick={() => setShowAnswer(!showAnswer)}>
          <div className='question-icon flex-1 d-flex align-items-center'>
            {/* <div className='item-icon'>
              <FontAwesomeIcon icon={faQuestion} className='icon' />
            </div> */}
            <h6 className='mb-0 fw-600'>{item.question}</h6>
          </div>
          <div className='button-show-answer' >
            {showAnswer ? (<FontAwesomeIcon icon={faChevronDown} />) : (<FontAwesomeIcon icon={faChevronUp} />)}
          </div>
        </div>
        {!showAnswer && (
          <div className='list-answer'>
            <p><Linkify text={text} pattern={pattern} formatter={formatter} /></p>
          </div>
        )}
      </div>
    </div>
  )
}
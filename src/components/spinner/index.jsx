import './index.scss'

export default function Spinner() {
  return (
    <div className="con-fl-loading">
      <div className='fl-loading radius'>
        <div className="effect-1 effects"/>
        <div className="effect-2 effects"/>
        <div className="effect-3 effects"/>
      </div>
    </div>
  )
}
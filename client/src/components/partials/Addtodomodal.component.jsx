import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { create_todo } from '../../services/api.js'

export default function Addtodomodal({refreshlist}) {
    const [todoDesc,settodoDesc]=useState('')
    const handleTodoSubmit= async ()=>
    {
     console.log(todoDesc)   
     if(todoDesc === '')
     {
toast("todo is required")
return
     }
     const result = await create_todo({desc:todoDesc})
     console.log(result)
     if(result.status===200 && result.data.status===200)
     {
      
      toast('todo added')
      refreshlist(new Date())
     }
     else
     {
      toast(result.data.message)
     }

    }
  return (
   
    <div className="modal mt-5" id="exampleModal">
        
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Add new Todo</div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="close"
          >
            <span arial-hidden="true"></span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <textarea
              name=""
              className="form-control"
              placeholder="Enter todos..."
              onChange={(e)=>
            {
                settodoDesc(e.target.value)
            }}
              rows={3}
            ></textarea>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary " onClick={handleTodoSubmit}
         
          data-bs-dismiss="modal"
          >Save Todo</button>
          <button className="btn btn-secondary" 
          onClick={()=>
          {
            settodoDesc('')
          }} data-bs-dismiss="modal">
            CLose
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

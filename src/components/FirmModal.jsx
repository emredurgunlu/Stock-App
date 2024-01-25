// import { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Modal from "@mui/material/Modal"
import { modalStyle } from "../styles/globalStyles"
import useStockCalls from "../service/useStockCalls"

export default function FirmModal({ open, handleClose, info, setInfo }) {
  const { postStock, putStock } = useStockCalls()

  const handleChange = (e) => {
    // const { name, value } = e.target
    // setInfo({ ...info, [name]: value })
    // e.target.name dediğimiz Firms.jsx içindeki     name, phone, address veya image dan herhangi biri olabilir
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  console.log(info)
  const handleSubmit = (e) => {
    e.preventDefault()
    // bu kısım submit işlemi butonu(bu dosyadaki en alttaki buton) new firmden gelen modal için mi yoksa edit iconundan gelen modal için mi bunu ayırt etmek için
    // new firmdeki info verisinde id bilgisi yok ama edit iconunun sebep olduğu info verisinde id var. bak FirmCard.jsx içinde EditIcon kısmı setInfo(firm)
    if (info._id) {
      putStock("firms", info)
    } else {
      postStock("firms", info)
    }

    handleClose()
  }

  console.log(info)
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Firm Name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              value={info.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Phone"
              name="phone"
              id="phone"
              type="tel"
              variant="outlined"
              value={info.phone}
              onChange={handleChange}
              required
            />
            <TextField
              label="Address"
              name="address"
              id="address"
              type="text"
              variant="outlined"
              value={info.address}
              onChange={handleChange}
              required
            />
            <TextField
              label="Image"
              name="image"
              id="image"
              type="url"
              variant="outlined"
              value={info.image}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" size="large">
              {info._id ? "Update Firm" : "Add Firm"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

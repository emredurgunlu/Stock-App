import { Alert, Skeleton, Stack } from "@mui/material"

export const ErrorMsg = () => {
  return (
    <Alert severity="error" sx={{ my: 3 }}>
      Veriler çekilemedi.
    </Alert>
  )
}

export const NoDataMsg = () => {
  return (
    <Alert severity="warning" sx={{ my: 3 }}>
      Gösterilecek bir veri bulunamadı.
    </Alert>
  )
}

// https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
// CardSkeleton componentine props geçilmedi bak Firms.jsx <CardSkeleton><FirmCard /></CardSkeleton>
export const CardSkeleton = ({ children }) => {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} my={3}>
      <Skeleton variant="rectangular">{children}</Skeleton>
    </Stack>
  )
}

// bu alttaki componenti rafce ile oluşturduk, export default ediyor. sadece 1 tane export default edilebilir.
// Üstteki componentleri de normal export ile yaptık. Yani bu sayfada 4 adet component var
const TableSkeleton = () => {
  return (
    <Stack spacing={1} sx={{ mt: 3 }}>
      <Skeleton variant="rectangular" width="100%" height={80} />
      <Skeleton variant="rectangular" width="100%" height={40} />
      <Skeleton variant="rectangular" width="100%" height={40} />
      <Skeleton variant="rectangular" width="100%" height={40} />
    </Stack>
  )
}

export default TableSkeleton

import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useRecoilValueLoadable } from 'recoil'
import Form from './Form'
import { authState } from '../../recoil/atoms/auth'
import { setAuthToken } from '../../src/utils/api/setAuthToken'
import API from '../../src/utils/api/api'
import { IWatchList } from '../../types/watchList'

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  const router = useRouter()
  const accessToken = useRecoilValueLoadable(authState)

  const [watchList, setWatchList] = useState<IWatchList>()

  const id = router.query.id as string

  useEffect(() => {
    ;(async () => {
      if (accessToken.state === 'hasValue' && id) {
        setAuthToken(accessToken.contents.accessToken)
        const url = `${process.env.NEXT_PUBLIC_API_URL}/watch-list/${id}`
        const res = await API.get<IWatchList>(url)
        setWatchList(res.data)
      }
    })()
  }, [accessToken, id])

  return (
    <>
      {id === undefined && <Form />}
      {id && <Form watchList={watchList} />}
    </>
  )
}

export default Register

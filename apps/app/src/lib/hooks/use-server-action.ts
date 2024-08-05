'use client'

import { useCallback, useState } from 'react'

type VoidCallback = (...args: any) => Promise<void>
type ValueCallback = (...args: any) => Promise<{ data: any, error?: never } | { data?: never, error: any }>
type Callback = VoidCallback | ValueCallback

type State<TData, TError> = |
  { status: 'idle' } |
  { status: 'pending' } |
  { status: 'data', data: TData } |
  { status: 'error', error: TError }

/**
 * @description Hook to execute a server action and handle its state
 *
 * @param fn Function that executes the server action and returns a promise with the result
 *
 * @returns An object with the following properties:
 *
 * - `pending`: A boolean indicating if the action is pending
 * - `data`: The data returned by the action, if any.
 * - `error`: The error thrown by the action, if any
 * - `execute`: A function to execute the action that returns a promise with the result
 * - `reset`: A function to reset the internal state
 *
 * @example
 * ```tsx
 * const { execute, reset, pending, data, error } = useServerAction(someServerAction)
 *
 * const onSubmit = async () => {
 *   await execute({ some: 'data' })
 * }
 *
 * return (
 *   <div>
 *     {pending && <p>Loading...</p>}
 *     {data && <p>Data: {data}</p>}
 *     {error && <p>Error: {error}</p>}
 *     <button onClick={onSubmit}>Submit</button>
 *     <button onClick={reset}>Reset</button>
 *   </div>
 * )
 * ```
 */
export function useServerAction<
  T extends Callback,
>(fn: T) {
  type Data = T extends (...args: any) => Promise<{ data: infer D, error?: never } | { data?: never, error: any }> ? D : never
  type Error = T extends (...args: any) => Promise<{ data: any, error?: never } | { data?: never, error: infer E }> ? E : never

  const [state, setState] = useState<State<Data, Error>>({
    status: 'idle',
  })

  const execute = useCallback(async (...args: Parameters<T>) => {
    setState({
      status: 'pending',
    })

    const res = await fn(...args)

    if (res?.error) {
      setState({
        status: 'error',
        error: res.error,
      })

      return {
        error: res.error,
      }
    }

    setState({
      status: 'data',
      data: res?.data,
    })

    return {
      data: res?.data,
    }
  }, [fn])

  const reset = useCallback(() => {
    setState({
      status: 'idle',
    })
  }, [])

  return {
    pending: state.status === 'pending',
    data: state.status === 'data' ? state.data : undefined,
    error: state.status === 'error' ? state.error : undefined,
    execute,
    reset,
  }
}

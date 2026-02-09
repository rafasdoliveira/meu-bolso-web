import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { AxiosInstance } from 'axios'
import { GetIncomesService } from './getIncomes.service'
import type { ApiResponse } from '@shared/types/apiResponse'
import type {
  GetIncomesIntputDto,
  GetIncomesOutputDto
} from './getIncomes.dto'

describe('GetIncomesService', () => {
  let apiMock: AxiosInstance
  let service: GetIncomesService

  beforeEach(() => {
    apiMock = {
      get: vi.fn()
    } as unknown as AxiosInstance

    service = new GetIncomesService(apiMock)
  })

  it('deve buscar incomes e retornar corretamente o payload', async () => {
    const params: GetIncomesIntputDto = {
      page: 1,
      size: 10
    }

    const incomes: GetIncomesOutputDto = {
      page: 1,
      size: 10,
      total: 1,
      data: [
        {
            id: 1,
            source: 'Salário',
            amount: '5000',
            date: '',
            notes: '',
            paymentType: '',
            status: ''
        }
      ]
    }

    const apiResponse: ApiResponse<GetIncomesOutputDto> = {
      data: incomes,
      message: 'success',
      status: 'success'
    }

    vi.mocked(apiMock.get).mockResolvedValueOnce({
      data: apiResponse
    } as unknown)

    const result = await service.execute(params)

    expect(apiMock.get).toHaveBeenCalledOnce()
    expect(apiMock.get).toHaveBeenCalledWith('/incomes', {
      params: {
        page: 1,
        size: 10
      }
    })

    expect(result).toEqual(incomes)
  })

  it('deve propagar erro quando a API falhar', async () => {
    const params: GetIncomesIntputDto = {
      page: 1,
      size: 10
    }

    const error = new Error('API error')

    vi.mocked(apiMock.get).mockRejectedValueOnce(error)

    await expect(service.execute(params)).rejects.toThrow('API error')
  })
})

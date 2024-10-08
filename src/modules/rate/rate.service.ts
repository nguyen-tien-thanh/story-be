import { BadGatewayException, Injectable, UnprocessableEntityException } from '@nestjs/common'
import { RateDto, UpdateRateDto } from './rate.dto'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class RateService {
  constructor(private prisma: PrismaService) {}

  async create(rateDto: RateDto) {
    if (!rateDto.rating) throw new BadGatewayException('Rating cannot be null')

    if (rateDto.rating != 1 && rateDto.rating != 2 && rateDto.rating != 3 && rateDto.rating != 4 && rateDto.rating != 5)
      throw new BadGatewayException('Rating should be from 1 to 5')

    try {
      return await this.prisma.rate.create({
        data: {
          createdBy: +rateDto.userId,
          productId: +rateDto.productId,
          rating: +rateDto.rating,
        },
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async findAllByProductId(productId: number) {
    try {
      return await this.prisma.rate.findMany({ where: { productId } })
    } catch (err) {
      throw new Error(err)
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.rate.findUnique({ where: { id } })
    } catch (err) {
      throw new Error(err)
    }
  }

  async update(id: number, updateRateDto: UpdateRateDto) {
    if (!updateRateDto.rating) throw new BadGatewayException('Rating cannot be null')

    if (
      updateRateDto.rating != 1 &&
      updateRateDto.rating != 2 &&
      updateRateDto.rating != 3 &&
      updateRateDto.rating != 4 &&
      updateRateDto.rating != 5
    )
      throw new BadGatewayException('Rating should be from 1 to 5')

    try {
      return await this.prisma.rate.update({
        where: { id },
        data: { ...updateRateDto },
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async remove(id: number) {
    return await this.prisma.rate.delete({
      where: { id },
    })
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from 'src/schema/profile.entity';
import { GetMeResponse } from 'src/types/models';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async getMe(userId: string): Promise<GetMeResponse> {
    const profile = await this.profileRepository.findOne({
      where: { accountId: userId },
    });

    if (!profile) return { profile: null };

    return { profile };
  }
}

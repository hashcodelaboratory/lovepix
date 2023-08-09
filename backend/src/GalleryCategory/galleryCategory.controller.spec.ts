import { Test, TestingModule } from '@nestjs/testing';
import { GalleryCategoryController } from './galleryCategory.controller';
import { GalleryCategoryService } from './galleryCategory.service';

describe('GalleryCategoryController', () => {
    let controller: GalleryCategoryController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GalleryCategoryController],
            providers: [GalleryCategoryService],
        }).compile();

        controller = module.get<GalleryCategoryController>(GalleryCategoryController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
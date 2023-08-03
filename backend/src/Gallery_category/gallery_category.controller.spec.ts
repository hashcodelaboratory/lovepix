import { Test, TestingModule } from '@nestjs/testing';
import { Gallery_categoryController } from './gallery_category.controller';
import { Gallery_categoryService } from './gallery_category.service';

describe('Gallery_categoryController', () => {
    let controller: Gallery_categoryController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [Gallery_categoryController],
            providers: [Gallery_categoryService],
        }).compile();

        controller = module.get<Gallery_categoryController>(Gallery_categoryController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
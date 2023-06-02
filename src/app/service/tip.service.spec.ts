import { TestBed } from '@angular/core/testing';

import { TipService } from './tip.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Tip } from '../dataaccess/tip';

describe('TipService', () => {
  let service: TipService;
  let httpSpy: Spy<HttpClient>;

  const fakeTips: Tip[] = [
    {
      id: 1,
      name: 'Tip 1',
      comment: 'Comment from tip 1'
    },
    {
      id: 2,
      name: 'Tip 2',
      comment: 'Comment from tip 2'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: createSpyFromClass(HttpClient)}
      ]
    });
    service = TestBed.inject(TipService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of tips', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeTips);

    service.getList().subscribe({
      next:
        tips => {
          expect(tips).toHaveSize(fakeTips.length);
          done();
          },
        error: done.fail
      }
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should create a new tip', (done: DoneFn) => {

    const newTip: Tip = {
      id: 3,
      name: 'Tip 3',
      comment: 'Comment from tip 3'
    };

    httpSpy.post.and.nextWith(newTip);

    service.save(newTip).subscribe({
        next: tip => {
          expect(tip).toEqual(newTip);
          done();
        },
        error: done.fail
      }
    );
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should update an tip', (done: DoneFn) => {

    const tip = fakeTips[0];
    tip.name = 'Updated Tip';

    httpSpy.put.and.nextWith(tip);

    service.update(tip).subscribe({
      next: tip => {
        expect(tip.name).toEqual('Updated Tip');
        done();
      },
      error: done.fail
    });
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should delete an existing tip', (done: DoneFn) => {

    httpSpy.delete.and.nextWith(new HttpResponse({
      status: 200
    }));

    service.delete(1).subscribe({
      next: response => {
        expect(response.status).toBe(200);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.delete.calls.count()).toBe(1);
  });

});

import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  TemplateRef,
  viewChild,
} from '@angular/core';
import {
  CellContext,
  ColumnDef,
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
  PaginationState,
  SortDirection,
  SortingState,
} from '@tanstack/angular-table';

interface Person {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
}

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

/**
 * TODO:
 */
@Component({
  selector: 'natu-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FlexRenderDirective],
})
export class NatuTableComponent {
  /** TODO: */
  readonly data = input<Person[]>(defaultData); // TODO REMOVE DEFAULT
  /** TODO: */
  readonly columns = input<ColumnDef<Person>[]>([
    // TODO REMOVE DEFAULT
    {
      accessorKey: 'firstName',
      header: 'First Name',
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
      cell: () => this.lastNameCell(),
    },
    {
      id: 'age',
      accessorKey: 'age',
      header: 'Age',
    },
    {
      accessorKey: 'visits',
      header: 'Visits',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'progress',
      header: 'Profile Progress',
    },
  ]);

  /** TODO: */
  readonly isLoading = input(false);
  /** TODO: */
  readonly rowCount = input<number>();
  /** TODO: */
  readonly pagination = model<PaginationState>({ pageIndex: 0, pageSize: 0 });
  /** TODO: */
  readonly sorting = model<SortingState>([]);

  protected readonly lastNameCell =
    viewChild.required<TemplateRef<{ $implicit: CellContext<Person, unknown> }>>('lastNameCell');

  protected ariaSortDictionary: Record<SortDirection, string> = {
    asc: 'ascending',
    desc: 'descending',
  };

  protected readonly table = createAngularTable(() => ({
    data: this.data(),
    columns: this.columns(),
    state: {
      sorting: this.sorting(),
      pagination: this.pagination(),
    },

    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualFiltering: true,
    manualPagination: true,
    enableSortingRemoval: false,

    onPaginationChange: (updaterOrValue) => {
      if (typeof updaterOrValue === 'function') {
        this.pagination.update(updaterOrValue);
      } else {
        this.pagination.set(updaterOrValue);
      }
    },
    onSortingChange: (updaterOrValue) => {
      if (typeof updaterOrValue === 'function') {
        this.sorting.update(updaterOrValue);
      } else {
        this.sorting.set(updaterOrValue);
      }
    },
    // TODO: on filter change needed?
  }));
}

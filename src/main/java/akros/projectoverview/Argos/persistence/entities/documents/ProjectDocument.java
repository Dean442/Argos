package akros.projectoverview.Argos.persistence.entities.documents;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Slf4j
@Getter
@Setter
@AllArgsConstructor
@ToString
@Builder
@Document("project")
public class ProjectDocument {

    @Id
    private String id;

    private String name;

    private Date startDate;

    private Date endDate;

    private List<String> mandates;

    private String customer;

}
